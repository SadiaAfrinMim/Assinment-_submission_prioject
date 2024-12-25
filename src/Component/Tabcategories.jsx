import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import AssignmentAll from '../Pages/Assignment/AssignmentAll';

const Tabcategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/assignments`);
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>Easy</Tab>
          <Tab>Medium</Tab>
          <Tab>Hard</Tab>
        </TabList>

        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-2">
            {categories
              .filter((assignment) => assignment.difficulty === 'Easy')
              .map((assignment) => (
                <AssignmentAll key={assignment._id} assignment={assignment} />
              ))}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-2 ">
            {categories
              .filter((assignment) => assignment.difficulty === 'Medium')
              .map((assignment) => (
                <AssignmentAll key={assignment._id} assignment={assignment} />
              ))}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-2">
            {categories
              .filter((assignment) => assignment.difficulty === 'Hard')
              .map((assignment) => (
                <AssignmentAll key={assignment._id} assignment={assignment} />
              ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Tabcategories;
