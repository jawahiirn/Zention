'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';
import { Skeleton } from '@/components/ui/skeleton';
import { Toolbar } from '@/components/toolbar';
import { useParams } from 'next/navigation';
import { Cover } from '@/components/cover';

const DocumentIdPage = () => {
  const Editor = useMemo(
    () => dynamic(() => import('@/components/editor'), { ssr: false }),
    []
  );
  const params = useParams();
  const update = useMutation(api.documents.update);
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<'documents'>,
  });
  const onChange = (content: string) => {
    update({
      id: params.documentId as Id<'documents'>,
      content,
    });
  };
  if (document === undefined) {
    return (
      <div>
        <div className="mx-auto mt-10 md:max-w-3xl lg:max-w-4xl">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-1/2" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-2/5" />
            <Skeleton className="h-4 w-3/5" />
          </div>
        </div>
      </div>
    );
  }
  if (document === null) {
    return <div>Not found</div>;
  }
  return (
    <div className="pb-[140px]">
      <Cover preview={true} url={document.coverImage} />
      <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
        <Toolbar preview initialData={document} />
        <Editor
          editable={false}
          onChange={onChange}
          initialContent={document.content}
        />
      </div>
    </div>
  );
};

export default DocumentIdPage;
