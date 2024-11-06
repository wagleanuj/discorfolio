'use client';

import { memo, useCallback } from 'react';
import { SchemaProperty } from './types';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { GripVertical } from 'lucide-react';

interface FormSectionProps {
  name: string;
  schema: SchemaProperty;
  path?: string;
  value: any;
  onChange: (path: string, value: any) => void;
}

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
}

const SortableItem = ({ id, children }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="p-1 text-gray-400 hover:text-gray-200 cursor-grab active:cursor-grabbing"
          {...listeners}
        >
          <GripVertical size={16} />
        </button>
        {children}
      </div>
    </div>
  );
};

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

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = parseInt(active.id.split('-').pop());
      const newIndex = parseInt(over.id.split('-').pop());
      
      if (!isNaN(oldIndex) && !isNaN(newIndex)) {
        const newValue = arrayMove(value || [], oldIndex, newIndex);
        onChange(currentPath, newValue);
      }
    }
  };

  // Handle object type schemas
  if (schema.type === 'object' && schema.properties) {
    return (
      <div className="p-4 border border-[#202225] rounded-md mb-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-200 capitalize">{name}</h3>
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
      <div className="p-4 border border-[#202225] rounded-md mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-200 capitalize">{name}</h3>
          <button
            type="button"
            onClick={() => {
              const newValue = [...arrayValue, schema.items?.type === 'object' ? {} : ''];
              onChange(currentPath, newValue);
            }}
            className="px-3 py-1 bg-[#5865f2] text-white rounded-md text-sm hover:bg-[#4752c4] transition-colors"
          >
            Add {name}
          </button>
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
                  <div className="flex-1 relative pl-4 border-l-2 border-[#202225]">
                    {schema.items?.type === 'object' && schema.items.properties ? (
                      <div className="space-y-4">
                        {Object.entries(schema.items.properties).map(([propName, propSchema]) => (
                          <FormSection
                            key={propName}
                            name={propName}
                            schema={propSchema as SchemaProperty}
                            path={`${currentPath}.${index}`}
                            value={item?.[propName as keyof typeof item]}
                            onChange={onChange}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          className="flex-1 bg-[#40444b] text-gray-200 rounded-md px-3 py-2 border border-[#202225] focus:outline-none focus:border-[#5865f2]"
                          value={item as string || ''}
                          onChange={(e) => {
                            const newValue = [...arrayValue];
                            newValue[index] = e.target.value;
                            onChange(currentPath, newValue);
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newValue = arrayValue.filter((_: unknown, i: number) => i !== index);
                            onChange(currentPath, newValue);
                          }}
                          className="text-red-500 hover:text-red-400 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
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

  // Handle primitive types
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-1">
        <span className="capitalize">{name}</span>
        {schema.description && (
          <span className="text-gray-400 text-xs ml-2">({schema.description})</span>
        )}
      </label>
      {schema.type === 'string' && schema.format === 'uri' ? (
        <input
          type="url"
          className="w-full bg-[#40444b] text-gray-200 rounded-md px-3 py-2 border border-[#202225] focus:outline-none focus:border-[#5865f2]"
          value={value || ''}
          onChange={handleChange}
        />
      ) : schema.type === 'string' && schema.format === 'email' ? (
        <input
          type="email"
          className="w-full bg-[#40444b] text-gray-200 rounded-md px-3 py-2 border border-[#202225] focus:outline-none focus:border-[#5865f2]"
          value={value || ''}
          onChange={handleChange}
        />
      ) : schema.type === 'string' && schema.pattern?.includes('date') ? (
        <input
          type="date"
          className="w-full bg-[#40444b] text-gray-200 rounded-md px-3 py-2 border border-[#202225] focus:outline-none focus:border-[#5865f2]"
          value={value || ''}
          onChange={handleChange}
        />
      ) : (
        <input
          type="text"
          className="w-full bg-[#40444b] text-gray-200 rounded-md px-3 py-2 border border-[#202225] focus:outline-none focus:border-[#5865f2]"
          value={value || ''}
          onChange={handleChange}
          pattern={schema.pattern}
        />
      )}
    </div>
  );
});

export default FormSection; 