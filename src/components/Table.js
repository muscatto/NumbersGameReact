import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

const Table = (props) => {
  const [results, setResults] = useState([]);

  async function readData() {
    const newResults = [];
    const q = query(collection(db, "rank"), orderBy("time"), limit(5));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      newResults.push({
        name: doc.data().name,
        time: doc.data().time,
        createdAt: doc.data().createElement,
      });
    });
    setResults(newResults);
  }

  useEffect(() => {
    readData();
  }, [props.modalStatus]);

  const tableItems = results.map((result, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{result.name}</td>
        <td>{result.time}</td>
      </tr>
    );
  });

  return (
    <div class="rank">
      <table>
        <caption>RANKING</caption>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>{tableItems}</tbody>
      </table>
    </div>
  );
};

export default Table;
