'use client';

import { ContentBlockEditor } from './content-block-editor';

// Deprecated: Use ContentBlockEditor instead
export function EnhancedTextEditor({ value, onChange, ...props }) {
  console.warn('EnhancedTextEditor is deprecated. Use ContentBlockEditor instead.');
  return <ContentBlockEditor value={value} onChange={onChange} {...props} />;
}