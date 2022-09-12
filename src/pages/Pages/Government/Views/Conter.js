import React, { useEffect, useState } from 'react'

function Conter() {
    let [count, setCount] = useState(30);

    useEffect(() => {
        const intervalId = setInterval(() => {
          setCount(prevCount => prevCount - 1);
        }, 1000);
      
        return () => clearInterval(intervalId);
      }, []);

    return (
        <div>
            {count}
        </div>
    )
}

export default Conter;