'use client';

import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import { Spinner } from '@/components/spinner';
import { useConvexAuth } from 'convex/react';
import { SignInButton } from '@clerk/clerk-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="max-w-3xl space-y-6 text-center mx-auto px-4 py-10"
    >
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
        🧠 Your ideas, documents & plans unified. <br />
        Welcome to{' '}
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent underline decoration-2">
          Zention ✨
        </span>
      </h1>

      <h3 className="text-lg sm:text-xl md:text-2xl text-gray-600 font-medium">
        Zention is the connected workspace where <br />
        better, faster work happens. 🚀
      </h3>

      {isLoading ? (
        <div className="flex w-full items-center justify-center pt-6">
          <Spinner size="md" />
        </div>
      ) : isAuthenticated ? (
        <Button
          asChild
          className="mt-4 px-6 py-3 text-lg rounded-xl bg-purple-600 hover:bg-purple-700 transition"
        >
          <Link href="/documents">
            Enter Zention 🎯
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      ) : (
        <SignInButton mode="modal">
          <Button className="mt-4 px-6 py-3 text-lg rounded-xl bg-pink-600 hover:bg-pink-700 transition">
            Get Zention free ✨
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Button>
        </SignInButton>
      )}
    </motion.div>
  );
};
