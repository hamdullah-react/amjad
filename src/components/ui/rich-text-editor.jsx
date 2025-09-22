'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from './button';
import { Separator } from './separator';
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link,
  Image,
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Undo,
  Redo
} from 'lucide-react';

export function RichTextEditor({ value = '', onChange, placeholder = 'Start writing...' }) {
  const editorRef = useRef(null);
  const [isEditorReady, setIsEditorReady] = useState(false);

  useEffect(() => {
    if (editorRef.current && isEditorReady) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || '';
      }
    }
  }, [value, isEditorReady]);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value || '';
      setIsEditorReady(true);
    }
  }, []);

  const executeCommand = (command, value = null) => {
    try {
      editorRef.current.focus();
      document.execCommand(command, false, value);
      if (onChange) {
        onChange(editorRef.current.innerHTML);
      }
    } catch (error) {
      console.error('Command execution failed:', error);
    }
  };

  const handleInput = (e) => {
    if (onChange) {
      onChange(e.target.innerHTML);
    }
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      executeCommand('createLink', url);
    }
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      executeCommand('insertImage', url);
    }
  };

  const formatBlock = (tag) => {
    executeCommand('formatBlock', tag);
  };

  const toolbarButtons = [
    {
      group: 'format',
      items: [
        { icon: Bold, command: 'bold', title: 'Bold' },
        { icon: Italic, command: 'italic', title: 'Italic' },
        { icon: Underline, command: 'underline', title: 'Underline' }
      ]
    },
    {
      group: 'headings',
      items: [
        { icon: Heading1, action: () => formatBlock('h1'), title: 'Heading 1' },
        { icon: Heading2, action: () => formatBlock('h2'), title: 'Heading 2' },
        { icon: Heading3, action: () => formatBlock('h3'), title: 'Heading 3' }
      ]
    },
    {
      group: 'lists',
      items: [
        { icon: List, command: 'insertUnorderedList', title: 'Bullet List' },
        { icon: ListOrdered, command: 'insertOrderedList', title: 'Numbered List' }
      ]
    },
    {
      group: 'align',
      items: [
        { icon: AlignLeft, command: 'justifyLeft', title: 'Align Left' },
        { icon: AlignCenter, command: 'justifyCenter', title: 'Align Center' },
        { icon: AlignRight, command: 'justifyRight', title: 'Align Right' },
        { icon: AlignJustify, command: 'justifyFull', title: 'Justify' }
      ]
    },
    {
      group: 'insert',
      items: [
        { icon: Link, action: insertLink, title: 'Insert Link' },
        { icon: Image, action: insertImage, title: 'Insert Image' },
        { icon: Quote, command: 'formatBlock', value: 'blockquote', title: 'Quote' },
        { icon: Code, command: 'formatBlock', value: 'pre', title: 'Code Block' }
      ]
    },
    {
      group: 'history',
      items: [
        { icon: Undo, command: 'undo', title: 'Undo' },
        { icon: Redo, command: 'redo', title: 'Redo' }
      ]
    }
  ];

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b p-2 flex flex-wrap gap-1">
        {toolbarButtons.map((group, groupIndex) => (
          <div key={groupIndex} className="flex gap-1">
            {group.items.map((button, index) => {
              const Icon = button.icon;
              return (
                <Button
                  key={index}
                  type="button"
                  variant="ghost"
                  size="sm"
                  title={button.title}
                  onClick={() => {
                    if (button.action) {
                      button.action();
                    } else if (button.value) {
                      executeCommand(button.command, button.value);
                    } else {
                      executeCommand(button.command);
                    }
                  }}
                  className="h-8 w-8 p-0"
                >
                  <Icon className="h-4 w-4" />
                </Button>
              );
            })}
            {groupIndex < toolbarButtons.length - 1 && (
              <Separator orientation="vertical" className="h-8 mx-1" />
            )}
          </div>
        ))}
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable={true}
        onInput={handleInput}
        onBlur={() => {
          if (onChange) {
            onChange(editorRef.current.innerHTML);
          }
        }}
        className="min-h-[300px] p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        style={{
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          lineHeight: '1.6'
        }}
        suppressContentEditableWarning={true}
        data-placeholder={placeholder}
      />

      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }

        [contenteditable] h1 {
          font-size: 2rem;
          font-weight: bold;
          margin: 1rem 0 0.5rem 0;
        }

        [contenteditable] h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 1rem 0 0.5rem 0;
        }

        [contenteditable] h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 1rem 0 0.5rem 0;
        }

        [contenteditable] p {
          margin: 0.5rem 0;
        }

        [contenteditable] ul, [contenteditable] ol {
          margin: 0.5rem 0;
          padding-left: 2rem;
        }

        [contenteditable] blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          background: #f9fafb;
        }

        [contenteditable] pre {
          background: #f3f4f6;
          padding: 1rem;
          border-radius: 0.375rem;
          margin: 1rem 0;
          font-family: 'Courier New', monospace;
          white-space: pre-wrap;
        }

        [contenteditable] img {
          max-width: 100%;
          height: auto;
          margin: 1rem 0;
        }

        [contenteditable] a {
          color: #3b82f6;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}