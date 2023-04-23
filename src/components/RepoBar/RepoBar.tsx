import React from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'
import { Breadcrumb, Space } from 'antd';
import {StarOutlined, EyeOutlined, ForkOutlined} from '@ant-design/icons'

const RepoBar = () => {
  const {url, stars, subscribers, forks} = useAppSelector(state=>state.repo.repo)
  const [user, repo] = url?.split('/') || ['', ''] 
  
  return ( 
    <Space style={{justifyContent: 'space-between', width: 600, paddingTop: '4px'}} size='large'>
      <Breadcrumb
      items={[
        {
          title: <a href={`https://github.com/${user}`}>{user}</a>
        },
        {
          title: <a href={`https://github.com/${url}`}>{repo}</a>
        }
      ]}
      >
      </Breadcrumb>
        <Space size='large'>
          <Space direction='vertical' align='center'>
            <StarOutlined/>
            {stars}
          </Space>
          <Space direction='vertical'align='center'>
            <EyeOutlined />
            {subscribers}
          </Space>
          <Space direction='vertical'align='center'>
            <ForkOutlined />
            {forks}
          </Space>
        </Space>
    </Space>
  )
}

export default RepoBar
