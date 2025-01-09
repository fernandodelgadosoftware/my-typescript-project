import { connectToDatabase } from './db';
import sql from 'mssql';

interface Grade {
  grade: string;
  points: number;
  includeInGpa: boolean;
}

const createGrade = async (grade: Grade) => {
  const pool = await connectToDatabase();
  try {
    const request = pool.request();
    request.input('grade', sql.NVarChar, grade.grade);
    request.input('points', sql.Decimal, grade.points);
    request.input('includeInGpa', sql.Bit, grade.includeInGpa);


    const result = await request.query(`
      INSERT INTO Grades (Grade, Points, IncludeInGpa)
      VALUES (@grade, @points, @includeInGpa)
    `);

    console.log('Grade created successfully:', result);
  } catch (err) {
    console.error('Error creating Grade:', err);
  } finally {
    pool.close();
  }
};

// Inserted values
const newGrade: Grade = {
  grade: 'G',
  points: -2.0,
  includeInGpa: true,
};

createGrade(newGrade).catch((err) => console.error('Error in createGrade:', err));
