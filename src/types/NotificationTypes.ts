export type NotificationContent = {
  message: string;
  title: string;
  imageSrc?: string;
}

export type NotificationResponse = {
  notificationFromDB: NotificationContent[]
}
