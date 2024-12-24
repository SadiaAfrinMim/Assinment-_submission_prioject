// import axios from 'axios';
// import React, { useEffect, useState } from 'react';

// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';

// const Tabcategories = () => {
//     const [categories,setCategories] = useState([])
//     const[filter,setFilter] = useState([])
//     useEffect(()=>{
//         fetchCategories()
//     },[])

//     const fetchCategories =async()=>{
//         const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/submit-assignment`)
//         setCategories(data)
        
//     }

//     console.log(filter)
//     return (
//         <div>
//               <Tabs>
//     <TabList
//     onChange={e=>setFilter(e.target.value)}>
//       <Tab >Easy</Tab>
//       <Tab>Medium</Tab>
//       <Tab>Hard</Tab>
//     </TabList>

//     <TabPanel >
//     <div className='grid grid-cols-1  gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
//             {categories
//               .filter(categorie => categorie.
//                 difficulty === 'Easy')
//               .map(categorie => (
//                 <JobCard key={categorie._id} categorie={categorie} />
//               ))}
//           </div>
//     </TabPanel>
//     <TabPanel>
//     <div className='grid grid-cols-1  gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
//             {categories
//               .filter(categorie => categorie.
//                 difficulty === 'Medium')
//               .map(categorie => (
//                 <JobCard key={categorie._id} categorie={categorie} />
//               ))}
//           </div>
//     </TabPanel>
//     <TabPanel>
//     <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
//             {categories
//               .filter(categorie => categorie.
//                 difficulty === 'Hard')
//               .map(categorie => (
//                 <JobCard key={categorie._id} categorie={categorie} />
//               ))}
//           </div>
//     </TabPanel>
//     <TabPanel>
//       <h2>Any content 2</h2>
//     </TabPanel>
//   </Tabs>
//         </div>
//     );
// };

// export default Tabcategories;