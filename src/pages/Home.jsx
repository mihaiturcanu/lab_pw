import { useEffect, useState } from "react";

function Home() {
    const [stats, setStats] = useState({
        total: 0,
        done: 0,
        inProgress: 0
    });

    useEffect(() => {
        async function fetchStats() {
            try {
                const response = await fetch("http://localhost:3000/api/stats");

                if (!response.ok) {
                    throw new Error("Eroare la încărcarea statisticilor");
                }

                const data = await response.json();
                setStats(data);
            } catch (err) {
                console.log("Error: " + err);
            }
        }

        fetchStats();
    }, []);

    return (
        <div>
            <h2>Home</h2>
            <p>Bine ai venit pe dashboard-ul meu!</p>

            <h3>Statistici proiecte</h3>
            <p>Total: {stats.total}</p>
            <p>Finalizate: {stats.done}</p>
            <p>În lucru: {stats.inProgress}</p>
        </div>
    );
}

export default Home;