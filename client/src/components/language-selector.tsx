import React from 'react';
// import removed: useLanguage, i18n
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

const languages = ['en', 'pt'];

// This component is now obsolete. Use the dropdown in pro-advanced-features.tsx instead.
export function LanguageSelector() {
  return null;
}
