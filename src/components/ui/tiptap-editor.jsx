'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import '@/styles/tiptap.css';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import Highlight from '@tiptap/extension-highlight';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import { useCallback, useState, useEffect } from 'react';
import { Button } from './button';
import { Input } from './input';
import { ImagePicker } from './image-picker';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Link as LinkIcon,
  Unlink,
  Image as ImageIcon,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Highlighter,
  Type,
  Undo,
  Redo,
  CodeIcon,
  Minus,
  Palette,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Create lowlight instance with common languages
const lowlight = createLowlight(common);

const MenuButton = ({ onClick, isActive, disabled, children, title }) => (
  <Button
    type="button"
    onClick={onClick}
    disabled={disabled}
    variant="ghost"
    size="sm"
    className={cn(
      'h-8 w-8 p-0',
      isActive && 'bg-primary/10 text-primary'
    )}
    title={title}
  >
    {children}
  </Button>
);

const MenuDivider = () => (
  <div className="w-px h-6 bg-border mx-1" />
);

export function TipTapEditor({
  value,
  onChange,
  placeholder = 'Start writing your content...',
  className,
  editorClassName
}) {
  const [linkUrl, setLinkUrl] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // Disable default codeBlock since we're using CodeBlockLowlight
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline',
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Highlight.configure({
        multicolor: true,
      }),
      TextStyle,
      Color,
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: 'javascript',
        HTMLAttributes: {
          class: 'bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto',
        },
      }),
    ],
    content: value || '',
    immediatelyRender: false, // Fix SSR hydration mismatch
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-lg max-w-none focus:outline-none min-h-[300px] p-4',
          'prose-headings:font-bold',
          'prose-h1:text-4xl prose-h1:mt-6 prose-h1:mb-4',
          'prose-h2:text-3xl prose-h2:mt-5 prose-h2:mb-3',
          'prose-h3:text-2xl prose-h3:mt-4 prose-h3:mb-2',
          'prose-p:text-base prose-p:my-3',
          'prose-ul:list-disc prose-ul:pl-6 prose-ul:my-3',
          'prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-3',
          'prose-li:my-1',
          'prose-strong:font-bold prose-a:text-primary prose-a:underline',
          'prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic',
          'prose-code:bg-gray-100 prose-code:text-gray-800 prose-code:px-1 prose-code:rounded',
          'prose-pre:bg-gray-900 prose-pre:text-gray-100',
          'prose-img:rounded-lg prose-img:max-w-full prose-img:h-auto',
          editorClassName
        ),
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
  });

  // Initialize content when value changes
  useEffect(() => {
    if (editor && value !== undefined && value !== editor.getHTML()) {
      editor.commands.setContent(value || '');
    }
  }, [value, editor]);

  const addImage = useCallback((url) => {
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const setLink = useCallback(() => {
    if (!linkUrl) {
      editor.chain().focus().unsetLink().run();
      setShowLinkInput(false);
      setLinkUrl('');
      return;
    }

    // Add https:// if no protocol is specified
    const url = linkUrl.match(/^https?:\/\//) ? linkUrl : `https://${linkUrl}`;

    editor.chain().focus().setLink({ href: url }).run();
    setShowLinkInput(false);
    setLinkUrl('');
  }, [editor, linkUrl]);

  const handleImageSelect = (url) => {
    addImage(url);
    setGalleryOpen(false);
  };

  if (!editor) {
    return null;
  }

  return (
    <div className={cn('border rounded-lg overflow-hidden bg-white', className)}>
      {/* Toolbar */}
      <div className="border-b bg-muted/30 p-2">
        <div className="flex flex-wrap items-center gap-1">
          {/* Text Formatting */}
          <div className="flex items-center">
            <MenuButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              isActive={editor.isActive('bold')}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              title="Bold (Ctrl+B)"
            >
              <Bold className="h-4 w-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              isActive={editor.isActive('italic')}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              title="Italic (Ctrl+I)"
            >
              <Italic className="h-4 w-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              isActive={editor.isActive('underline')}
              disabled={!editor.can().chain().focus().toggleUnderline().run()}
              title="Underline (Ctrl+U)"
            >
              <UnderlineIcon className="h-4 w-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              isActive={editor.isActive('strike')}
              disabled={!editor.can().chain().focus().toggleStrike().run()}
              title="Strikethrough"
            >
              <Strikethrough className="h-4 w-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              isActive={editor.isActive('highlight')}
              title="Highlight"
            >
              <Highlighter className="h-4 w-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().toggleCode().run()}
              isActive={editor.isActive('code')}
              disabled={!editor.can().chain().focus().toggleCode().run()}
              title="Inline Code"
            >
              <Code className="h-4 w-4" />
            </MenuButton>
          </div>

          <MenuDivider />

          {/* Headings */}
          <div className="flex items-center">
            <MenuButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              isActive={editor.isActive('heading', { level: 1 })}
              title="Heading 1"
            >
              <Heading1 className="h-4 w-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              isActive={editor.isActive('heading', { level: 2 })}
              title="Heading 2"
            >
              <Heading2 className="h-4 w-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              isActive={editor.isActive('heading', { level: 3 })}
              title="Heading 3"
            >
              <Heading3 className="h-4 w-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().setParagraph().run()}
              isActive={editor.isActive('paragraph')}
              title="Paragraph"
            >
              <Type className="h-4 w-4" />
            </MenuButton>
          </div>

          <MenuDivider />

          {/* Lists */}
          <div className="flex items-center">
            <MenuButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              isActive={editor.isActive('bulletList')}
              title="Bullet List"
            >
              <List className="h-4 w-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              isActive={editor.isActive('orderedList')}
              title="Ordered List"
            >
              <ListOrdered className="h-4 w-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              isActive={editor.isActive('blockquote')}
              title="Blockquote"
            >
              <Quote className="h-4 w-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              isActive={editor.isActive('codeBlock')}
              title="Code Block"
            >
              <CodeIcon className="h-4 w-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              title="Horizontal Rule"
            >
              <Minus className="h-4 w-4" />
            </MenuButton>
          </div>

          <MenuDivider />

          {/* Alignment */}
          <div className="flex items-center">
            <MenuButton
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              isActive={editor.isActive({ textAlign: 'left' })}
              title="Align Left"
            >
              <AlignLeft className="h-4 w-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              isActive={editor.isActive({ textAlign: 'center' })}
              title="Align Center"
            >
              <AlignCenter className="h-4 w-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              isActive={editor.isActive({ textAlign: 'right' })}
              title="Align Right"
            >
              <AlignRight className="h-4 w-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().setTextAlign('justify').run()}
              isActive={editor.isActive({ textAlign: 'justify' })}
              title="Justify"
            >
              <AlignJustify className="h-4 w-4" />
            </MenuButton>
          </div>

          <MenuDivider />

          {/* Links and Images */}
          <div className="flex items-center gap-1">
            {showLinkInput ? (
              <div className="flex items-center gap-1">
                <Input
                  type="url"
                  placeholder="Enter URL"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      setLink();
                    }
                    if (e.key === 'Escape') {
                      setShowLinkInput(false);
                      setLinkUrl('');
                    }
                  }}
                  className="h-8 w-48 text-sm"
                  autoFocus
                />
                <Button
                  type="button"
                  onClick={setLink}
                  size="sm"
                  className="h-8 px-2"
                >
                  Add
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setShowLinkInput(false);
                    setLinkUrl('');
                  }}
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <>
                <MenuButton
                  onClick={() => {
                    const previousUrl = editor.getAttributes('link').href;
                    setLinkUrl(previousUrl || '');
                    setShowLinkInput(true);
                  }}
                  isActive={editor.isActive('link')}
                  title="Add Link"
                >
                  <LinkIcon className="h-4 w-4" />
                </MenuButton>
                {editor.isActive('link') && (
                  <MenuButton
                    onClick={() => editor.chain().focus().unsetLink().run()}
                    title="Remove Link"
                  >
                    <Unlink className="h-4 w-4" />
                  </MenuButton>
                )}
              </>
            )}

            <MenuButton
              onClick={() => setGalleryOpen(true)}
              title="Insert Image"
            >
              <ImageIcon className="h-4 w-4" />
            </MenuButton>
          </div>

          <MenuDivider />

          {/* History */}
          <div className="flex items-center">
            <MenuButton
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().chain().focus().undo().run()}
              title="Undo (Ctrl+Z)"
            >
              <Undo className="h-4 w-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().chain().focus().redo().run()}
              title="Redo (Ctrl+Y)"
            >
              <Redo className="h-4 w-4" />
            </MenuButton>
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />

      {/* Removed Floating Menu and Bubble Menu for simplicity */}

      {/* Image Picker Modal */}
      {galleryOpen && (
        <ImagePicker
          isOpen={galleryOpen}
          onClose={() => setGalleryOpen(false)}
          onSelect={handleImageSelect}
        />
      )}
    </div>
  );
}