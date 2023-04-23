import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { addIssues } from '../../redux/issues/issueThunk'
import { setRepoData } from '../../redux/repo/repoThunk'
import {Form, Input, Button, Space, Alert} from 'antd'
import {GithubOutlined} from '@ant-design/icons'


export default function SearchForm() {
    const [repo, setRepo] = useState('')
    const [isInvalidURL, setIsInvalidURL] = useState(false)
    const dispatch = useAppDispatch()
    
    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIsInvalidURL(false)
        setRepo(event.target.value)
    }

    const onFormSumbit = (event: FormEvent<HTMLFormElement>) => {
        try {
           if (!repo) {
            return
        }
        const pathnameArr = new URL(repo).pathname.split('/')
        const params = {owner: pathnameArr[1], repo: pathnameArr[2]}
        dispatch(setRepoData(params)).unwrap().then(()=>{
            dispatch(addIssues(params))
        })  
        } catch (error:any) {
            setIsInvalidURL(true)
        }
        
    }

    return (
        <>
        {isInvalidURL && <Alert message='Please enter a valid repository URL' type='error' showIcon/>}
        <Form 
            onFinish={onFormSumbit}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ width: 600 }}
            layout="inline"
        >
            <Space.Compact style={{ width: '100%' }}>
                <Input placeholder='Enter repo URL' onChange={onInputChange} required/>
                <Button type="primary" htmlType="submit">
                    <GithubOutlined />
                    Load issues
                </Button>
            </Space.Compact>
        </Form>
        </>
  )
}
