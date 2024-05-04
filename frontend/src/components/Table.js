import { useState, useEffect } from 'react';

function Table() {

    const [flows, setFlows] = useState([]);
    useEffect(() => {
        fetch("current_status")
            .then(
                response => response.json()
                    .then(
                        data => setFlows(data)
                    )
            )
        }
    )

    const setRunStatusEmoji = (value) => {
        if (value == null) {
            return null
        } else if (value == "succeeded") {
            return "✅"
        } else if (value == "running") {
            return "🏃"
        } else if (value == "failed") {
            return "❌"
        }
    }

    return (
        <table className='runStatusTable table-hover' id='runStatusTable'>
            <thead>
                <tr className='resultTableRow'>
                    <th>Current Status</th>
                    <th>Workflow Name</th>
                </tr>
            </thead>
            <tbody>
                {flows.map((flow) => (
                    <tr className='resultTableRow'>
                        <td>{setRunStatusEmoji(flow.status)}</td>
                        <td>{flow.parent_workflow_name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table;