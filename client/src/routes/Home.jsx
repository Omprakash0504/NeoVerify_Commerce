import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Landing from "../components/Landing/Landing";
import FeaturedItems from "../components/Featured/Items/FetauredItems";
import FeaturedCategories from "../components/Featured/Categories/FeaturedCategories";
import { TabTitle } from "../utils/General";


const Home = () => {
    const [ featuredItems, setFeaturedItems ] = useState()
    TabTitle("Home - Shema");

    useEffect(() => {
        axios.get("http://localhost:5000/api/items")
            .then(res => setFeaturedItems(res.data))
            .catch(err => console.log(err))

        window.scrollTo(0, 0)
    }, [])

    useEffect(()=>{
        axios.get("http://localhost:5000/api/user")
            .then(res => setFeaturedItems(res.data))
            .catch(err => console.log(err))
    },[])

    return ( 
        <Fragment>
            <Landing />
            <FeaturedCategories />
            <FeaturedItems items={featuredItems}/>
        </Fragment>
    );
}
 
export default Home;