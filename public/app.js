document.getElementById("screenForm").addEventListener("submit", async e=>{

        e.preventDefault();

        const payload = {

            name: document.getElementById("name").value,
            householdSize: Number(document.getElementById("householdSize").value),
            income: Number(document.getElementById("income").value),
        }

      

        const res = await fetch("/api/screen",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })

        const data = await res.json();


        document.getElementById("result").innerText = `Result: You're ${data.result} (Limit: $${data.limit})`
        document.getElementById("result").className = data.result.toLowerCase();
    });
