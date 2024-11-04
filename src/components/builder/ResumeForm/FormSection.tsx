'use client';

import { SchemaProperty } from './types';
import { useId } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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

function SortableItem({ id, children }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

export default function FormSection({ 
  name, 
  schema, 
  path = '', 
  value, 
  onChange 
}: FormSectionProps) {
  const currentPath = path ? `${path}.${name}` : name;
  const sectionId = useId();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = parseInt(active.id.toString().split('-').pop() || '0');
      const newIndex = parseInt(over.id.toString().split('-').pop() || '0');
      
      if (!isNaN(oldIndex) && !isNaN(newIndex) && Array.isArray(value)) {
        const newValue = arrayMove(value, oldIndex, newIndex);
        onChange(currentPath, newValue);
      }
    }
  };

  const SortableList = ({ items, renderItem }: { items: any[], renderItem: (item: any, index: number) => React.ReactNode }) => (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((_, index) => `${sectionId}-${index}`)}
        strategy={verticalListSortingStrategy}
      >
        {items.map((item, index) => (
          <SortableItem key={`${sectionId}-${index}`} id={`${sectionId}-${index}`}>
            {renderItem(item, index)}
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  );

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

  if (schema.type === 'array') {
    // Handle arrays of primitive values
    if (schema.items && schema.items.type !== 'object') {
      return (
        <div className="p-4 border border-[#202225] rounded-md mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-200 capitalize">{name}</h3>
            <button
              type="button"
              className="bg-[#5865f2] text-white px-3 py-1 rounded-md text-sm hover:bg-[#4752c4] transition-colors"
              onClick={() => {
                const newValue = [...(value || []), ''];
                onChange(currentPath, newValue);
              }}
            >
              Add {name}
            </button>
          </div>
          {schema.description && (
            <p className="text-gray-400 text-sm mb-4">{schema.description}</p>
          )}
          {Array.isArray(value) && (
            <SortableList
              items={value}
              renderItem={(item, index) => (
                <div className="flex items-center gap-2 bg-[#2f3136] p-2 rounded mb-2 cursor-move">
                  <div className="text-gray-400 hover:text-gray-200 px-1">⋮⋮</div>
                  <input
                    type="text"
                    className="flex-1 bg-[#40444b] text-gray-200 rounded-md px-3 py-2 border border-[#202225] focus:outline-none focus:border-[#5865f2]"
                    value={item || ''}
                    onChange={(e) => {
                      const newValue = [...value];
                      newValue[index] = e.target.value;
                      onChange(currentPath, newValue);
                    }}
                    placeholder={`Enter ${name} item`}
                  />
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-400 transition-colors px-2"
                    onClick={() => {
                      const newValue = value.filter((_: any, i: number) => i !== index);
                      onChange(currentPath, newValue);
                    }}
                  >
                    Remove
                  </button>
                </div>
              )}
            />
          )}
        </div>
      );
    }

    // Handle arrays of objects
    if (schema.items?.type === 'object' && schema.items.properties) {
      return (
        <div className="p-4 border border-[#202225] rounded-md mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-200 capitalize">{name}</h3>
            <button
              type="button"
              className="bg-[#5865f2] text-white px-3 py-1 rounded-md text-sm hover:bg-[#4752c4] transition-colors"
              onClick={() => {
                const newValue = [...(value || []), {}];
                onChange(currentPath, newValue);
              }}
            >
              Add {name}
            </button>
          </div>
          {schema.description && (
            <p className="text-gray-400 text-sm mb-4">{schema.description}</p>
          )}
          {Array.isArray(value) && (
            <SortableList
              items={value}
              renderItem={(item, index) => (
                <div className="ml-4 mb-4 border-l-2 border-[#202225] pl-4 bg-[#2f3136] rounded p-4 cursor-move">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <div className="text-gray-400 hover:text-gray-200 px-1">⋮⋮</div>
                      <h4 className="text-md font-medium text-gray-300">
                        {name} #{index + 1}
                      </h4>
                    </div>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-400 transition-colors"
                      onClick={() => {
                        const newValue = value.filter((_: any, i: number) => i !== index);
                        onChange(currentPath, newValue);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                  {schema.items.properties && Object.entries(schema.items.properties).map(([propName, propSchema]) => (
                    <FormSection
                      key={propName}
                      name={propName}
                      schema={propSchema as SchemaProperty}
                      path={`${currentPath}.${index}`}
                      value={item[propName]}
                      onChange={onChange}
                    />
                  ))}
                </div>
              )}
            />
          )}
        </div>
      );
    }
  }

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
          onChange={(e) => onChange(currentPath, e.target.value)}
        />
      ) : schema.type === 'string' && schema.format === 'email' ? (
        <input
          type="email"
          className="w-full bg-[#40444b] text-gray-200 rounded-md px-3 py-2 border border-[#202225] focus:outline-none focus:border-[#5865f2]"
          value={value || ''}
          onChange={(e) => onChange(currentPath, e.target.value)}
        />
      ) : schema.type === 'string' && schema.pattern?.includes('date') ? (
        <input
          type="date"
          className="w-full bg-[#40444b] text-gray-200 rounded-md px-3 py-2 border border-[#202225] focus:outline-none focus:border-[#5865f2]"
          value={value || ''}
          onChange={(e) => onChange(currentPath, e.target.value)}
        />
      ) : (
        <input
          type="text"
          className="w-full bg-[#40444b] text-gray-200 rounded-md px-3 py-2 border border-[#202225] focus:outline-none focus:border-[#5865f2]"
          value={value || ''}
          onChange={(e) => onChange(currentPath, e.target.value)}
          pattern={schema.pattern}
        />
      )}
    </div>
  );
} 