// composables/useNotifications.js
import { ref } from 'vue';
import { gql } from '@apollo/client/core';
import apolloClient from '~/apollo/client';

// GraphQL query to get notifications
const GET_NOTIFICATIONS = gql`
  query GetNotifications($userId: Int!) {
    notifications(where: { user_id: { _eq: $userId }, is_read: { _eq: false } }) {
      id
      notification_type
      created_at
      recipe {
        title
      }
    }
  }
`;

// GraphQL mutation to mark notifications as read
const MARK_NOTIFICATIONS_AS_READ = gql`
  mutation MarkNotificationsAsRead($ids: [Int!]!) {
    update_notifications(
      where: { id: { _in: $ids } },
      _set: { is_read: true }
    ) {
      affected_rows
    }
  }
`;



// Composable to fetch notifications and mark them as read
export function useNotifications(userId) {
  const notifications = ref([]);

  // Fetch notifications for the user
  const fetchNotifications = async () => {
    try {
      const { data } = await apolloClient.query({
        query: GET_NOTIFICATIONS,
        variables: { userId },
        fetchPolicy: 'network-only'
      });
      notifications.value = data.notifications;

      // Mark notifications as read
      if (data.notifications.length > 0) {
        const notificationIds = data.notifications.map(notification => notification.id);
        await markNotificationsAsRead(notificationIds);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  // Call mutation to mark notifications as read
  const markNotificationsAsRead = async (notificationIds) => {
    try {
      await apolloClient.mutate({
        mutation: MARK_NOTIFICATIONS_AS_READ,
        variables: { ids: notificationIds },
      });
    } catch (error) {
      console.error('Failed to mark notifications as read:', error);
    }
  };

  return {
    notifications,
    fetchNotifications,
  };
}
