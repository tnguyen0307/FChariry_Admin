import * as React from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { IPagingDto, ResponseList } from '@/core/models/common';
import { cn } from '@/core/utils/tailwind';

interface ScrollInfinityBuilderProps<T = any> {
    sourceKey: string;
    apiAction: (dto: IPagingDto) => Promise<ResponseList<T>>;
    pageSize?: number;
    render: (item: T, index: number) => React.ReactNode;
    className?: string;
    filters?: string[];
    scrollableTarget?: string;
    style?: React.CSSProperties;
    height?: number;
    children: (loading: boolean, data: T[]) => React.ReactNode;
}

const ScrollInfinityBuilder = <
    T extends {
        id: string;
    } = {
        id: string;
    },
>({
    sourceKey,
    apiAction,
    pageSize = 10,
    filters = [],
    className,
    scrollableTarget,
    style,
    height,
    children,
}: ScrollInfinityBuilderProps<T>) => {
    const infiniteQuery = useInfiniteQuery({
        queryKey: [sourceKey],
        queryFn: async ({ pageParam = 0 }) => {
            const data = await apiAction({
                page: pageParam,
                pageSize,
                filters,
                orderBy: ['createdAt||DESC'],
            });

            return {
                ...data,
                prevPage: pageParam,
            };
        },
        getNextPageParam: (lastPage) => {
            if (lastPage.prevPage + 1 >= lastPage.totalPage) {
                return undefined;
            }

            return lastPage.prevPage + 1;
        },
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        initialPageParam: 0,
    });

    const data = infiniteQuery.data?.pages.map((page) => page.data).flat() || [];

    return (
        <InfiniteScroll
            className={cn(
                {
                    'flex items-center justify-center': infiniteQuery.isLoading,
                },
                className,
            )}
            dataLength={data.length}
            next={() => infiniteQuery.fetchNextPage()}
            endMessage={<div className="col-span-3 flex items-center justify-center py-1 text-xs opacity-25"></div>}
            hasMore={infiniteQuery.hasNextPage}
            loader={
                <div className="col-span-3 flex items-center justify-center py-4">
                    <Loader2 className="text-primary h-4 w-4 animate-spin" />
                </div>
            }
            scrollableTarget={scrollableTarget}
            style={style}
            height={height}
        >
            {children(infiniteQuery.isLoading, data)}
        </InfiniteScroll>
    );
};

export default ScrollInfinityBuilder;
