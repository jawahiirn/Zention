'use client';

import React, { useRef, ElementRef, useState, useEffect } from 'react';
import {
  ChevronsLeftIcon,
  MenuIcon,
  PlusCircle,
  Search,
  Settings,
} from 'lucide-react';
import { useMediaQuery } from 'usehooks-ts';
import { usePathname } from 'next/navigation';
import { UserItem } from '@/app/(main)/_components/user-item';
import { Item } from '@/app/(main)/_components/item';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';

export const Navigation = () => {
  const documents = useQuery(api.documents.get, { parentDocument: undefined });
  const create = useMutation(api.documents.create);

  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<'aside'>>(null);
  const navbarRef = useRef<ElementRef<'div'>>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  useEffect(() => {
    if (isMobile) {
      onCollapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      onCollapse();
    }
  }, [pathname, isMobile]);

  const onMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  const onMouseMove = (e: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = e.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty('left', `${newWidth}px`);
      navbarRef.current.style.setProperty(
        'width',
        `calc(100% - ${newWidth}px)`
      );
    }
  };
  const onMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? '100%' : '240px';
      navbarRef.current.style.removeProperty('width');
      navbarRef.current.style.setProperty(
        'width',
        isMobile ? '0' : 'calc(100% - 240px)' // add space around `-`
      );
      navbarRef.current.style.setProperty('left', isMobile ? '100%' : '240px');
      setTimeout(() => setIsResetting(false), 300);
    }
  };
  const onCollapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = '0';
      navbarRef.current.style.setProperty('width', '100%');
      navbarRef.current.style.setProperty('left', '0');
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const onCreateDocument = () => {
    const promise = create({ title: 'Untitled' });

    toast.promise(promise, {
      loading: 'Creating a new note...',
      success: 'New note created!',
      error: 'Failed to create note :(',
    });
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          'group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999',
          isResetting && 'transition-all duration-300 ease-in-out',
          isMobile && 'w-0'
        )}
      >
        <div
          className={cn(
            'h-6 w-6 text-muted-foreground rounded-sm hover:bg-newtural-400 dark:hover:bg-neutral-600 absolute ' +
              'top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition',
            isMobile && 'opacity-100'
          )}
          role={'button'}
          onClick={onCollapse}
        >
          <ChevronsLeftIcon className="h-6 w-6" />
        </div>
        <div>
          <UserItem />
          <Item label="Search" icon={Search} isSearch onClick={() => {}} />
          <Item label="Settings" icon={Settings} onClick={() => {}} />
          <Item onClick={onCreateDocument} label="New page" icon={PlusCircle} />
        </div>
        <div className={'mt-4'}>
          {documents &&
            documents.map((doc, index) => <p key={index}>{doc.title}</p>)}
        </div>
        <div
          onMouseDown={onMouseDown}
          className={
            'opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-[2px] bg-primary/10 right-0 top-0'
          }
        />
      </aside>
      <div
        className={cn(
          'absolute left-60 top-0 z-[300] w-[calc(100%-240px)]',
          isResetting && 'transition-all duration-300 ease-in-out',
          isMobile && 'left-0 w-full'
        )}
        ref={navbarRef}
      >
        <nav
          className={cn(
            'w-full bg-transparent px-3 py-2',
            !isCollapsed && 'p-0'
          )}
        >
          {isCollapsed && (
            <MenuIcon
              onClick={resetWidth}
              role="button"
              className="h-6 w-6 cursor-pointer text-muted-foreground"
            />
          )}
        </nav>
      </div>
    </>
  );
};
