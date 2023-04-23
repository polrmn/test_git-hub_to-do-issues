import "./App.css";
import RepoBar from "./components/RepoBar/RepoBar";
import SearchForm from "./components/SearchForm/SearchForm";
import ToDoList from "./components/ToDoList/ToDoList";
import { useAppSelector } from "./hooks/reduxHooks";
import { Layout, Row, Col, Divider} from 'antd';

function App() {
  const {url} = useAppSelector(state=>state.repo.repo)  
  return (
    <main>
        <Layout className="container" style={{padding: '20px 0'}}>
          <SearchForm/> 
          {url && <RepoBar/>}
          <Divider/>
          <Row style={{width: '100%'}}>
            <Col span={8} style={{textAlign: 'center', height: '100%'}}>
              <ToDoList status="open"/>
            </Col>
            <Col span={8} style={{textAlign: 'center'}}>
              <ToDoList status="inProgress"/>
            </Col>
            <Col span={8} style={{textAlign: 'center'}}>
              <ToDoList status="done"/>
            </Col>
          </Row>
        </Layout>
    </main>
  );
}

export default App;
