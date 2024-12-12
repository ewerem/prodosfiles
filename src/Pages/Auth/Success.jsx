import React, { useEffect } from 'react'
import Menu from '../../assets/Menu.png'
import unsplash from '../../assets/unsplash.png'
import { useNavigate } from 'react-router-dom'

const Success = () => {
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
  const user_id = urlParams.get("u_info");
    const decodedInfo = JSON.parse(user_id.replace(/'/g, '"'));
    const token = decodedInfo.token;
    const uidb64 = decodedInfo.u_id;
    const value = { token, uidb64 };

  useEffect(()=>{
    axios.post(`https://proodoosfiles.onrender.com/api/verify`, value)
    .then(res => {
        console.log(res);
        navigate('/login')
    })
    .catch(err => {
        console.log(err);
    })

  }, [])

  console.log(user_id);
  

  return (
    <div className=' w-full h-screen'>
   
   <div className='flex justify-between items-center lg:block'>
            <h3 className=' font-[Poppins] text-[#773DD3] text-base font-extrabold mt-[37px] ml-[24px] lg:ml-[70px] lg:mt-[40px] '>Prodos<span className='font-normal'>Files</span></h3>
            <img className='mt-[37px] mr-[24px] lg:hidden' src = {Menu}/>
        </div>

        <h3 className='block  lg:hidden font-[Poppins] text-xs font-normal text-center mt-[142px] text-[#242424]'>Your account has been created <br/>
              successfully!</h3>  
              
              <h3 className='lg:hidden font-[Poppins] mt-[31px] text-center text-[#242424] font-semibold'>Thank You</h3>
              <div className='lg:hidden flex justify-center '><button className='pt-[13px] pb-[13px] pl-[20px] pr-[20px] bg-[#5A7CD2] text-[white] font-normal text-xs  mt-[31px]'>Go back home</button> 
               </div>

               {/* big screen */}
               <div className="hidden lg:flex lg:justify-between lg:items-center ml-[70px] mt-[84px]">
    {/* Text Section */}
    <div>
      <h3 className="font-[Poppins] text-base font-normal text-[#242424]">
        Your account has been created successfully!
      </h3>
      <h3 className="font-[Poppins] font-semibold text-2xl mt-[20px]">
        Thank You
      </h3>
    </div>

    {/* Image Section */}
    <div className="object-contain mr-[76px]">
      <img src={unsplash} alt="Thank You" />
    </div>
  </div>
    <div class="hidden lg:grid place-items-center  ">
  <button class="px-4 py-2 text-white text-[#white] bg-[#5A7CD2] rounded">Continue</button>
</div>
</div>
        
    
  )
}

export default Success
