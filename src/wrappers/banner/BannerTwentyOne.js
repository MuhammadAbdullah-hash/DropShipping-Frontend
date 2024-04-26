import PropTypes from "prop-types";
import { url } from "../../environment";

import { useState, useEffect } from "react";

import clsx from "clsx";
import bannerData from "../../data/banner/banner-twenty-one.json";
import BannerTwentyOneSingle from "../../components/banner/BannerTwentyOneSingle.js";

const BannerTwentyOne = ({ spaceTopClass, spaceBottomClass }) => {
  const [Categories, setCategories] = useState();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    // setLoading(true);
    // setIsLoading(true);

    let urlnew = `${url}/user/categories/list`;

    fetch(urlnew, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          let categoriesData = data?.data?.categories;
          if(categoriesData.length >=3){
            categoriesData = categoriesData.slice(0, 3);
            setCategories( categoriesData  );
            
          }
          else{
            setCategories(categoriesData);
          }
          
        }
      })
      .catch((error) => {});


      const payload = {
      "first_name" : "Muhammad", 
      "last_name" : "Abdullah", 
      "username" : "hitt25", 
      "age" : "20", 
      "phone" : "+9233207443",
      "lat" : "31.4573727",
      "long" : "74.299893"
      };

        let api_address = `http://amplifi-env.eba-nyuymhm3.us-east-1.elasticbeanstalk.com/api/users/signup`
 
        fetch(api_address, {
                method: 'POST',
                mode: "cors",
                headers: {
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin' : "*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(payload)

            })
        .then((res) => res.json())
        .then( (responce)=>{
          console.log({responce})
            if( responce.success ){}
            else{
                console.log(responce.error)
            }
           })
        .catch((err)=>{
            console.log(err.error)
        })



  };

  return (
    <div className={clsx("banner-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="row">
          {Categories &&
            Categories?.map((single, key) => (
              <div className="col-lg-4 col-md-4" key={key}>
                <BannerTwentyOneSingle data={single} spaceBottomClass="mb-30" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

BannerTwentyOne.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default BannerTwentyOne;
