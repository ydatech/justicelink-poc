// const password = prompt("Enter admin password");
const password = "pass1234"
if(!password){
    alert("Access Denied!")
    window.location.href = "/"
}


fetch("/api/admin", {
    headers:{
        "x-admin-password" : password
    }
})
.then(res =>{
    if(!res.ok){
        throw new Error("Unauthorized")
    }

    return res.json();
}).then(data=>{
    console.log(data);
    const tbody = document.querySelector("#table tbody");

    if(data.lenth === 0){
        tbody.innerHTML = `
        <tr>
            <td colspan="6" style="text-align:center;">No records found</td>
        </tr>
        `
        return;
    }

    data.forEach(r=>{
        const badgeClass = r.result.toLowerCase();

        tbody.innerHTML += `
            <tr>
                <td>${r.name}</td>
                <td>${r.householdSize}</td>
                <td>${r.income}</td>
                <td>${r.limitValue} </td>
                <td>
                    <span class="badge ${badgeClass}">
                        ${r.result}
                    </span>
                </td>
                <td>${new Date(r.timestamp).toLocaleString()}</td>
            </tr>
        `
    })


}).catch(()=>{
    alert("Unauthorized access. Redirecting...")
    window.location.href = "/"
})
