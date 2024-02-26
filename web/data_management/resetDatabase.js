import sequelize from '../config/db.js';
import './product.model.js';

sequelize.drop().then(() => {
    console.log('All tables dropped.');
  
    sequelize.sync({ force: true }).then(() => {
      console.log('Database schema recreated successfully.');
    }).catch((syncError) => {
      console.error('Error recreating database schema:', syncError);
    });
  
  }).catch((dropError) => {
    console.error('Error dropping tables:', dropError);
  });
