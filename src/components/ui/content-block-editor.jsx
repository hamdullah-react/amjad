'use client';

import { useState, useEffect } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Textarea } from './textarea';
import { Label } from './label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { ImagePicker } from './image-picker';
import {
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Type,
  Heading,
  Image,
  List,
  Quote,
  Link,
  GripVertical
} from 'lucide-react';

const BLOCK_TYPES = {
  paragraph: { icon: Type, label: 'Paragraph' },
  heading: { icon: Heading, label: 'Heading' },
  image: { icon: Image, label: 'Image' },
  list: { icon: List, label: 'List' },
  quote: { icon: Quote, label: 'Quote' },
  link: { icon: Link, label: 'Link' }
};

export function ContentBlockEditor({ value = { blocks: [] }, onChange }) {
  const [blocks, setBlocks] = useState(value.blocks || []);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [editingImageBlock, setEditingImageBlock] = useState(null);

  // Initialize blocks from value only when value changes
  useEffect(() => {
    if (value && value.blocks && JSON.stringify(value.blocks) !== JSON.stringify(blocks)) {
      setBlocks(value.blocks);
    }
  }, [value]);

  // Call onChange only when blocks actually change, not on every render
  useEffect(() => {
    if (onChange && blocks.length >= 0) {
      onChange({ blocks });
    }
  }, [blocks]);

  const addBlock = (type) => {
    const newBlock = createEmptyBlock(type);
    setBlocks(prevBlocks => [...prevBlocks, newBlock]);
  };

  const createEmptyBlock = (type) => {
    const id = Date.now().toString();
    const baseBlock = { id, type };

    switch (type) {
      case 'paragraph':
        return { ...baseBlock, content: '' };
      case 'heading':
        return { ...baseBlock, level: 2, content: '' };
      case 'image':
        return { ...baseBlock, url: '', alt: '', caption: '' };
      case 'list':
        return { ...baseBlock, items: [''], ordered: false };
      case 'quote':
        return { ...baseBlock, content: '', author: '' };
      case 'link':
        return { ...baseBlock, text: '', url: '' };
      default:
        return { ...baseBlock, content: '' };
    }
  };

  const updateBlock = (index, updates) => {
    setBlocks(prevBlocks => {
      const newBlocks = [...prevBlocks];
      newBlocks[index] = { ...newBlocks[index], ...updates };
      return newBlocks;
    });
  };

  const deleteBlock = (index) => {
    setBlocks(prevBlocks => prevBlocks.filter((_, i) => i !== index));
  };

  const moveBlock = (index, direction) => {
    setBlocks(prevBlocks => {
      const newBlocks = [...prevBlocks];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;

      if (targetIndex >= 0 && targetIndex < newBlocks.length) {
        [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
      }
      return newBlocks;
    });
  };

  const handleImageSelect = (url) => {
    if (editingImageBlock !== null) {
      updateBlock(editingImageBlock, { url });
      setEditingImageBlock(null);
    }
    setGalleryOpen(false);
  };

  const addListItem = (blockIndex) => {
    setBlocks(prevBlocks => {
      const newBlocks = [...prevBlocks];
      const block = newBlocks[blockIndex];
      newBlocks[blockIndex] = {
        ...block,
        items: [...(block.items || []), '']
      };
      return newBlocks;
    });
  };

  const updateListItem = (blockIndex, itemIndex, value) => {
    setBlocks(prevBlocks => {
      const newBlocks = [...prevBlocks];
      const block = newBlocks[blockIndex];
      const newItems = [...(block.items || [])];
      newItems[itemIndex] = value;
      newBlocks[blockIndex] = { ...block, items: newItems };
      return newBlocks;
    });
  };

  const removeListItem = (blockIndex, itemIndex) => {
    setBlocks(prevBlocks => {
      const newBlocks = [...prevBlocks];
      const block = newBlocks[blockIndex];
      const newItems = (block.items || []).filter((_, i) => i !== itemIndex);
      newBlocks[blockIndex] = { ...block, items: newItems };
      return newBlocks;
    });
  };

  const renderBlockEditor = (block, index) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <Textarea
            value={block.content}
            onChange={(e) => updateBlock(index, { content: e.target.value })}
            placeholder="Enter paragraph content..."
            rows={4}
            className="w-full"
          />
        );

      case 'heading':
        return (
          <div className="space-y-2">
            <div className="flex gap-2">
              <Select
                value={block.level?.toString()}
                onValueChange={(value) => updateBlock(index, { level: parseInt(value) })}
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">H1</SelectItem>
                  <SelectItem value="2">H2</SelectItem>
                  <SelectItem value="3">H3</SelectItem>
                  <SelectItem value="4">H4</SelectItem>
                </SelectContent>
              </Select>
              <Input
                value={block.content}
                onChange={(e) => updateBlock(index, { content: e.target.value })}
                placeholder="Enter heading text..."
                className="flex-1"
              />
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                value={block.url}
                onChange={(e) => updateBlock(index, { url: e.target.value })}
                placeholder="Image URL..."
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditingImageBlock(index);
                  setGalleryOpen(true);
                }}
              >
                Gallery
              </Button>
            </div>
            <Input
              value={block.alt}
              onChange={(e) => updateBlock(index, { alt: e.target.value })}
              placeholder="Alt text..."
            />
            <Input
              value={block.caption}
              onChange={(e) => updateBlock(index, { caption: e.target.value })}
              placeholder="Caption (optional)..."
            />
            {block.url && (
              <img src={block.url} alt={block.alt} className="max-w-xs rounded border" />
            )}
          </div>
        );

      case 'list':
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <Label>List Type:</Label>
              <Select
                value={block.ordered ? 'ordered' : 'unordered'}
                onValueChange={(value) => updateBlock(index, { ordered: value === 'ordered' })}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unordered">Bullet</SelectItem>
                  <SelectItem value="ordered">Numbered</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {block.items?.map((item, itemIndex) => (
              <div key={itemIndex} className="flex gap-2">
                <Input
                  value={item}
                  onChange={(e) => updateListItem(index, itemIndex, e.target.value)}
                  placeholder={`Item ${itemIndex + 1}...`}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeListItem(index, itemIndex)}
                  disabled={block.items.length <= 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addListItem(index)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        );

      case 'quote':
        return (
          <div className="space-y-2">
            <Textarea
              value={block.content}
              onChange={(e) => updateBlock(index, { content: e.target.value })}
              placeholder="Enter quote content..."
              rows={3}
            />
            <Input
              value={block.author}
              onChange={(e) => updateBlock(index, { author: e.target.value })}
              placeholder="Author (optional)..."
            />
          </div>
        );

      case 'link':
        return (
          <div className="space-y-2">
            <Input
              value={block.text}
              onChange={(e) => updateBlock(index, { text: e.target.value })}
              placeholder="Link text..."
            />
            <Input
              value={block.url}
              onChange={(e) => updateBlock(index, { url: e.target.value })}
              placeholder="URL..."
            />
          </div>
        );

      default:
        return (
          <Textarea
            value={block.content || ''}
            onChange={(e) => updateBlock(index, { content: e.target.value })}
            placeholder="Enter content..."
            rows={3}
          />
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Add Block Buttons */}
      <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg">
        <span className="text-sm font-medium text-gray-700 mr-2">Add Block:</span>
        {Object.entries(BLOCK_TYPES).map(([type, { icon: Icon, label }]) => (
          <Button
            key={type}
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addBlock(type)}
            className="flex items-center gap-1"
          >
            <Icon className="h-3 w-3" />
            {label}
          </Button>
        ))}
      </div>

      {/* Content Blocks */}
      <div className="space-y-3">
        {blocks.map((block, index) => {
          const BlockIcon = BLOCK_TYPES[block.type]?.icon || Type;
          return (
            <div key={block.id} className="border rounded-lg p-4 bg-white">
              {/* Block Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-4 w-4 text-gray-400" />
                  <BlockIcon className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {BLOCK_TYPES[block.type]?.label || block.type}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => moveBlock(index, 'up')}
                    disabled={index === 0}
                  >
                    <MoveUp className="h-3 w-3" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => moveBlock(index, 'down')}
                    disabled={index === blocks.length - 1}
                  >
                    <MoveDown className="h-3 w-3" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteBlock(index)}
                  >
                    <Trash2 className="h-3 w-3 text-red-500" />
                  </Button>
                </div>
              </div>

              {/* Block Content Editor */}
              {renderBlockEditor(block, index)}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {blocks.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <Type className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No content blocks</h3>
          <p className="text-gray-500 mb-4">Add your first content block to get started.</p>
        </div>
      )}

      {/* Image Picker Modal */}
      {galleryOpen && (
        <ImagePicker
          isOpen={galleryOpen}
          onClose={() => {
            setGalleryOpen(false);
            setEditingImageBlock(null);
          }}
          onSelect={handleImageSelect}
        />
      )}
    </div>
  );
}