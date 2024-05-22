import {useQuery} from 'rect-query';

const fetchMyData = async() =>{
    const res = await fetch('https://dummyjson.com/products');
    return res.json();
}

const MyComponent =() =>{
    const {data , isLoading, error} = useQuery('myData', fetchMyData);
    if(isLoading){
        return <div>Loading...</div>;
    }
    if(error){
        return <div>Error:{error.message}</div>
    }
    return <div>Data:{data.tilte}</div>
}
export default MyComponent();