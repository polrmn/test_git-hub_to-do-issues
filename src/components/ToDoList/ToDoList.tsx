import React from 'react';
import {Space, Typography, List } from 'antd'
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { updateIssueStatus } from "../../redux/issues/issueThunk";
import ToDoItem from "../ToDoItem/ToDoItem";
import useLS from '../../hooks/useLocalStorage';

const {Title} = Typography

interface ToDoListProps {
  status: string;
}

const ToDoList: React.FC<ToDoListProps> = ({ status }) => {

  const dispatch = useAppDispatch()

  const issues = useAppSelector((state) => state.issues.issues);
  
  const sortedIssues = issues.filter((issue) => issue.status === status) || [];
  const title = status === "open" ? "ToDo" : status === "inProgress" ? "In Progress" : "Done";

  useLS();

  const onDragStart = (event: any, id: number|null) => {
    event.dataTransfer.setData("data", id);
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>, status: string) => {
    event.preventDefault();

    const itemId = +event.dataTransfer.getData("data");

    dispatch(updateIssueStatus({ issueId: itemId, newStatus: status }));
  };

  const onDragOver = (event: any) => {
    event.preventDefault();
  };


  return (
    <Space 
      direction="vertical" 
      align="center" 
      style={{padding: '0 20px 12 0px 20px', marginTop: 8}} 
      id={status}
      className='bordered'
      onDragOver={onDragOver} 
      onDrop={(event) => onDrop(event, status)}
    >
      <Title level={2}>{title}</Title>
      <List
        style={{height: '100%', borderTop: '1px solid rgba(0, 0, 0, 0.45)', padding: '10px 10px'}}
        itemLayout="horizontal"
        dataSource={sortedIssues}
        renderItem={(item) => (
      <List.Item 
        key={item.id} 
        draggable='true'
        onDragStart={(event) => onDragStart(event, item.id)}
        onDragOver={onDragOver}
        className='shadow'
        style={{cursor: 'grabbing', marginBottom: '10px'}}
      >
        <ToDoItem issue={item} />
      </List.Item>
    )}
      />
    </Space>
  )
};

export default ToDoList;