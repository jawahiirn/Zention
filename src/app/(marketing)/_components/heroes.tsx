import Image from 'next/image';

export const Heroes = () => {
  return (
    <div className="flex max-w-5xl flex-col items-center justify-center">
      <div className="flex items-center">
        <div className="relative h-[18.75rem] w-[18.75rem] sm:h-[21.875rem] sm:w-[21.875rem] md:h-[25rem] md:w-[25rem]">
          <Image
            src="/idea.jpg"
            fill
            className="object-contain dark:hidden"
            alt="Idea"
          />
          <Image
            src="/idea-dark.jpg"
            fill
            className="hidden object-contain dark:block"
            alt="Idea"
          />
        </div>
        <div className="relative hidden h-[25rem] w-[25rem] md:block">
          <Image
            src="/pair-dark.jpg"
            fill
            className="object-contain dark:hidden"
            alt="Team"
          />
          <Image
            src="/pair.jpg"
            fill
            className="hidden object-contain dark:block"
            alt="Team"
          />
        </div>
      </div>
    </div>
  );
};
