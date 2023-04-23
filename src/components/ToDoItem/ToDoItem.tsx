import React from 'react';
import formatDate from '../../helpers/formatDate';
import { Card } from 'antd';

interface ToDoItemProps {
  issue: {
    title: string | null;
    number: number | null;
    user: string | null;
    date: string;
    comments: number | null;
  };
}

const ToDoItem: React.FC<ToDoItemProps> = ({ issue }) => {
  const { title, number, user, date, comments } = issue;

  return (
    <Card title={title} bordered={false} style={{ width: 300 }}>
      <p>Issue Number: {number}</p>
      <p>Created By: {user}</p>
      <p>Created {formatDate(date)}</p>
      <p>Number of Comments: {comments}</p>
    </Card>
  );
};

export default ToDoItem