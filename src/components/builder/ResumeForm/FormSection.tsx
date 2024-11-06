'use client';

import { memo, useCallback } from 'react';
import { SchemaProperty } from './types';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { GripVertical, Plus, Trash2 } from 'lucide-react';
import Tooltip from '@/components/common/Tooltip/Tooltip';

interface FormSectionProps {
  name: string;
  schema: SchemaProperty;
  path?: string;
  value: any;
  onChange: (path: string, value: any) => void;
}

const SortableItem = memo(({ id, children }: { id: string; children: React.ReactNode }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
    zIndex: isDragging ? 1 : undefined,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes}
      className={`transition-all duration-200 ${isDragging ? 'opacity-75 scale-[1.02]' : ''}`}
    >
      <div className="flex-1 relative pl-4 border-l-2 border-[#202225] bg-[#2f3136] rounded-md p-3 group transition-all duration-200 hover:bg-[#36393f]">
        <div className="flex items-center gap-2 mb-2">
          <div
            {...listeners}
            className="p-1 text-gray-400 hover:text-gray-200 cursor-grab active:cursor-grabbing rounded transition-colors"
          >
            <GripVertical size={16} className="transition-transform group-hover:scale-110" />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
});

SortableItem.displayName = 'SortableItem';

const FormSection = memo(function FormSection({ 
  name, 
  schema, 
  path = '', 
  value, 
  onChange 
}: FormSectionProps) {
  const currentPath = path ? `${path}.${name}` : name;
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(currentPath, e.target.value);
  }, [currentPath, onChange]);

  const handleDragEnd = useCallback((event: any) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = parseInt(active.id.split('-').pop() || '0');
      const newIndex = parseInt(over.id.split('-').pop() || '0');
      
      if (!isNaN(oldIndex) && !isNaN(newIndex)) {
        const newValue = arrayMove(value || [], oldIndex, newIndex);
        onChange(currentPath, newValue);
      }
    }
  }, [value, currentPath, onChange]);

  // Handle primitive types
  if (!schema.type || (!schema.properties && !schema.items)) {
    return (
      <div className="mb-4">
        <label className="block mb-2">
          <span className="text-sm font-medium text-gray-300 capitalize">{name}</span>
          {schema.description && (
            <span className="block text-xs text-gray-400 mt-0.5">
              {schema.description}
            </span>
          )}
        </label>
        <input
          type={
            schema.type === 'string' && schema.format === 'uri' ? 'url' :
            schema.type === 'string' && schema.format === 'email' ? 'email' :
            schema.type === 'string' && schema.pattern?.includes('date') ? 'date' :
            'text'
          }
          className="w-full bg-[#40444b] text-gray-200 rounded-md px-3 py-2 border border-[#202225] focus:outline-none focus:border-[#5865f2] transition-all hover:border-[#5865f2]/50 focus:ring-2 focus:ring-[#5865f2]/20"
          value={value || ''}
          onChange={handleChange}
          pattern={schema.pattern}
        />
      </div>
    );
  }

  // Handle object type schemas
  if (schema.type === 'object' && schema.properties) {
    return (
      <div className="p-4 bg-gradient-to-r from-[#2f3136] to-[#36393f] rounded-lg mb-4 border border-[#202225]">
        <h3 className="text-lg font-bold text-white mb-4 capitalize">{name}</h3>
        <div className="space-y-4">
          {Object.entries(schema.properties).map(([propName, propSchema]) => (
            <FormSection
              key={propName}
              name={propName}
              schema={propSchema as SchemaProperty}
              path={currentPath}
              value={value?.[propName]}
              onChange={onChange}
            />
          ))}
        </div>
      </div>
    );
  }

  // Handle array type schemas
  if (schema.type === 'array' && schema.items) {
    const arrayValue = value || [];
    return (
      <div className="p-4 bg-gradient-to-r from-[#2f3136] to-[#36393f] rounded-lg mb-4 border border-[#202225]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white capitalize">{name}</h3>
          <Tooltip content={`Add new ${name}`}>
            <button
              type="button"
              onClick={() => {
                const newValue = [...arrayValue, schema.items?.type === 'object' ? {} : ''];
                onChange(currentPath, newValue);
              }}
              className="p-2 bg-[#202225] text-gray-300 hover:text-white rounded-md hover:bg-[#36393f] transition-all group hover:scale-105 active:scale-95"
            >
              <Plus size={16} className="group-hover:text-[#5865f2] transition-colors" />
            </button>
          </Tooltip>
        </div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={arrayValue.map((_: unknown, index: number) => `${currentPath}-${index}`)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {arrayValue.map((item: unknown, index: number) => (
                <SortableItem key={`${currentPath}-${index}`} id={`${currentPath}-${index}`}>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <Tooltip content="Remove item">
                        <button
                          type="button"
                          onClick={() => {
                            const newValue = arrayValue.filter((_: unknown, i: number) => i !== index);
                            onChange(currentPath, newValue);
                          }}
                          className="p-1 text-gray-400 hover:text-red-400 rounded transition-all hover:scale-110 active:scale-95"
                        >
                          <Trash2 size={16} />
                        </button>
                      </Tooltip>
                    </div>

                    {/* Item Content */}
                    {schema.items?.type === 'object' && schema.items.properties ? (
                      <div className="space-y-4 bg-[#2f3136] rounded-md p-4">
                        {Object.entries(schema.items.properties).map(([propName, propSchema]) => (
                          <div key={propName} className="mb-4">
                            <div className="bg-[#36393f] rounded-md p-3">
                              <FormSection
                                name={propName}
                                schema={propSchema as SchemaProperty}
                                path={`${currentPath}.${index}`}
                                value={item?.[propName as keyof typeof item]}
                                onChange={onChange}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <input
                        type="text"
                        className="w-full bg-[#40444b] text-gray-200 rounded-md px-3 py-2 border border-[#202225] focus:outline-none focus:border-[#5865f2] transition-all hover:border-[#5865f2]/50 focus:ring-2 focus:ring-[#5865f2]/20"
                        value={item as string || ''}
                        onChange={(e) => {
                          const newValue = [...arrayValue];
                          newValue[index] = e.target.value;
                          onChange(currentPath, newValue);
                        }}
                      />
                    )}
                  </div>
                </SortableItem>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    );
  }
});

FormSection.displayName = 'FormSection';

export default FormSection; 