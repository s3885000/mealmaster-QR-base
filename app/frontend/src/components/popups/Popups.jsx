import React from 'react'
import './popup.css'

const Popups = ({visible}) => {
  // if (!visible) return null;

  return (
    <div className='fixed inset-x-0 bottom-0 bg-black bg-opacity-30 flex'>
      <div className='bg-white p-2 rounded-t-lg h-fit w-screen text-center'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, ut magni rerum atque vel quo fugiat eveniet praesentium tempora, magnam quidem maxime quaerat aliquid perferendis quisquam repellendus. Eligendi eaque recusandae, error distinctio aperiam ad veniam quam aspernatur! Atque, cumque similique! Vero quisquam saepe quasi veniam facere ea id culpa mollitia corporis consectetur? Expedita laudantium quisquam voluptates accusamus tempore cumque, ipsa nemo illum ullam distinctio id ipsam reiciendis suscipit repellendus eius nihil. Eum accusantium delectus quis tempora aliquam magnam dignissimos quisquam mollitia facilis libero a quam voluptatibus quaerat, molestiae eius reiciendis, voluptatum, nam officiis praesentium maxime voluptas. Qui omnis autem, perspiciatis est obcaecati voluptas accusantium praesentium eveniet sapiente veritatis, tenetur aperiam atque corrupti ullam dolore? Ipsam, dolorum eaque?
      </div>
    </div>
  );
}

export default Popups