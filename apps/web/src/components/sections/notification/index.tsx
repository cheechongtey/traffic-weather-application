'use client';

import { onFetchRecentSearchApi } from '@/actions/api';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import dayjs from 'dayjs';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';

const Notification = () => {
  const { toast } = useToast();
  const { data, status } = useSession();

  const fetchNotification = useCallback(async () => {
    const userId = data?.user?.id ?? '';
    const resp = await onFetchRecentSearchApi(userId);

    if (resp.otherRecentSearch) {
      toast({
        title: 'Someone just search for this location recently',
        description: `${resp.otherRecentSearch.location_name} - ${dayjs(
          resp.otherRecentSearch.datetime
        ).format('DD/MM/YYYY hh:mma')}`,
      });
    }

    if (resp.userRecentSearch) {
      setTimeout(() => {
        toast({
          title: 'Your recent search',
          description: `${resp.userRecentSearch.location_name} - ${dayjs(
            resp.userRecentSearch.datetime
          ).format('DD/MM/YYYY hh:mma')}`,
        });
      }, 10000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    if (status === 'authenticated') {
      setTimeout(() => {
        fetchNotification();
      }, 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return <Toaster />;
};

export default Notification;
