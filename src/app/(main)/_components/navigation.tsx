'use client';

import React, { useRef, ElementRef, useEffect } from 'react';
import {
  ChevronsLeftIcon,
  MenuIcon,
  PlusCircle,
  Search,
  Settings,
  Plus,
  Trash,
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useSearch } from '@/hooks/use-search';
import { useSettings } from '@/hooks/use-settings';
import { useSidebar } from '@/hooks/use-sidebar';
import { useMediaQuery } from 'usehooks-ts';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { UserItem } from '@/app/(main)/_components/user-item';
import { Item } from '@/app/(main)/_components/item';
import { TrashBox } from './trash-box';
import { DocumentList } from '@/app/(main)/_components/document-list';
import { Navbar } from '@/app/(main)/_components/navbar';

export const Navigation = () => {
  const router = useRouter();
  const create = useMutation(api.documents.create);
  const settings = useSettings();
  const search = useSearch();
  const sidebar = useSidebar();

  const pathname = usePathname();
  const params = useParams();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<'aside'>>(null);
  const navbarRef = useRef<ElementRef<'div'>>(null);

  const onSidebarToggle = () => {
    if (sidebar.isCollapsed) {
      resetWidth();
    } else {
      onCollapse();
    }
  };

  useEffect(() => {
    sidebar.setToggleCallback(onSidebarToggle);
  }, [sidebar.isCollapsed]);

  useEffect(() => {
    if (isMobile) {
      sidebar.onCollapse();
      onCollapse();
    } else {
      sidebar.onExpand();
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      sidebar.onCollapse();
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
      sidebar.onExpand();
      sidebar.setResetting(true);

      sidebarRef.current.style.width = isMobile ? '100%' : '240px';
      navbarRef.current.style.removeProperty('width');
      navbarRef.current.style.setProperty(
        'width',
        isMobile ? '0' : 'calc(100% - 240px)' // add space around `-`
      );
      navbarRef.current.style.setProperty('left', isMobile ? '100%' : '240px');
      setTimeout(() => sidebar.setResetting(false), 300);
    }
  };
  const onCollapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      sidebar.onCollapse();
      sidebar.setResetting(true);

      sidebarRef.current.style.width = '0';
      navbarRef.current.style.setProperty('width', '100%');
      navbarRef.current.style.setProperty('left', '0');
      setTimeout(() => sidebar.setResetting(false), 300);
    }
  };

  const onCreateDocument = () => {
    const promise = create({ title: 'Untitled' }).then((documentId) =>
      router.push(`/documents/${documentId}`)
    );

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
          sidebar.isResetting && 'transition-all duration-300 ease-in-out',
          isMobile && 'w-0'
        )}
      >
        <Tooltip>
          <TooltipTrigger>
            <div
              className={cn(
                'h-6 w-6 cursor-pointer text-muted-foreground rounded-sm hover:bg-neutral-400 dark:hover:bg-neutral-600 absolute ' +
                  'top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition',
                isMobile && 'opacity-100'
              )}
              role={'button'}
              onClick={onCollapse}
            >
              <ChevronsLeftIcon className="h-6 w-6" />
            </div>
          </TooltipTrigger>
          <TooltipContent side={'bottom'} align={'center'}>
            <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[.625rem] font-medium text-muted-foreground opacity-100 dark:bg-neutral-700">
              <span className="text-xs">CTRL</span>L
            </kbd>
          </TooltipContent>
        </Tooltip>
        <div>
          <UserItem />
          <Item label="Search" icon={Search} isSearch onClick={search.onOpen} />
          <Item label="Settings" icon={Settings} onClick={settings.onOpen} />
          <Item onClick={onCreateDocument} label="New page" icon={PlusCircle} />
        </div>
        <div className={'mt-4'}>
          <DocumentList />
          <Item onClick={onCreateDocument} label={'Add a page'} icon={Plus} />
          <Popover>
            <PopoverTrigger className="mt-4 w-full">
              <Item label="Trash" icon={Trash} />
            </PopoverTrigger>
            <PopoverContent
              side={isMobile ? 'bottom' : 'right'}
              className="w-72 p-0"
            >
              <TrashBox />
            </PopoverContent>
          </Popover>
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
          sidebar.isResetting && 'transition-all duration-300 ease-in-out',
          isMobile && 'left-0 w-full'
        )}
        ref={navbarRef}
      >
        {params.documentId ? (
          <Navbar isCollapsed={sidebar.isCollapsed} onResetWidth={resetWidth} />
        ) : (
          <nav
            className={cn(
              'w-full bg-transparent px-3 py-2',
              !sidebar.isCollapsed && 'p-0'
            )}
          >
            {sidebar.isCollapsed && (
              <MenuIcon
                onClick={resetWidth}
                role="button"
                className="h-6 w-6 cursor-pointer text-muted-foreground"
              />
            )}
          </nav>
        )}
      </div>
    </>
  );
};
