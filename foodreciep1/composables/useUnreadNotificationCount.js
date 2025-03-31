import { ref } from 'vue';
import { gql } from '@apollo/client/core';
import apolloClient from '~/apollo/client';

const GET_UNREAD_NOTIFICATION_COUNT = gql`
  query GetUnreadNotificationCount($userId: Int!) {
    notifications_aggregate(
      where: { user_id: { _eq: $userId }, is_read: { _eq: false } }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export function useUnreadNotificationCount(userId) {
  const unreadCount = ref(0);

  const fetchUnreadCount = async () => {
    try {
      const { data } = await apolloClient.query({
        query: GET_UNREAD_NOTIFICATION_COUNT,
        variables: { userId},
        fetchPolicy: 'network-only'
      });
      unreadCount.value = data.notifications_aggregate.aggregate.count;
    } catch (error) {
      console.error('Failed to fetch unread notification count:', error);
    }
  };

  return { unreadCount, fetchUnreadCount };
}
