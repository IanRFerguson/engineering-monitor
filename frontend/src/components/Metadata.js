import { useState, useEffect } from 'react';

function Metadata() {
    const [meta, setMeta] = useState([]);
    useEffect(() => {
        fetch("get_metadata")
            .then(
                response => response.json()
                    .then(
                        data => setMeta(data[0])
                    )
            )
        }, []
    )

    console.log(meta)

    return(
        <div>
            <h4>Over the last seven days we are averaging a <b>{meta.success_rate}% success rate</b></h4>
            <p>Last updated {meta.last_updated}</p>
        </div>
       
    )
}

export default Metadata;