import React from 'react'

const Tab = ({tabData,accountType,setAccountType}) => {
  function hendleOnClick(type){
       setAccountType(type);
  }
  
  return (
    <div className='tabDiv'>
        {
          tabData.map((tab,index)=>{
            return(
              <div onClick={()=>{hendleOnClick(tab.type)}} key={index} className={`normalTab ${accountType===tab.type?'activeTab':''}`}>
                {tab.tabName}
              </div>
            )
          })
        }
    </div>
    
  )
}

export default Tab
