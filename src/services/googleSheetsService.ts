//  Google Sheets Integration Service
// This service handles the connection to Google Sheets for storing enrollment data

export async function saveEnrollmentToGoogleSheets(userId: string, courseId: string, courseName: string, enrollmentDate: string) {
  try {
    // Use our proxy to make the request to Google Sheets
    const response = await fetch('https://hooks.jdoodle.net/proxy?url=https://script.google.com/macros/s/YOUR_GOOGLE_SHEETS_WEB_APP_ID/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'saveEnrollment',
        data: {
          userId,
          courseId,
          courseName,
          enrollmentDate,
          status: 'active'
        }
      })
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error saving enrollment to Google Sheets:', error);
    throw error;
  }
}

export async function getUserEnrollmentsFromSheets(userId: string) {
  try {
    // Use our proxy to make the request to Google Sheets
    const response = await fetch(`https://hooks.jdoodle.net/proxy?url=https://script.google.com/macros/s/YOUR_GOOGLE_SHEETS_WEB_APP_ID/exec?action=getEnrollments&userId=${userId}`, {
      method: 'GET',
    });

    const data = await response.json();
    return data.enrollments || [];
  } catch (error) {
    console.error('Error fetching enrollments from Google Sheets:', error);
    throw error;
  }
}

export async function updateEnrollmentProgress(userId: string, courseId: string, completedModules: string[], isCompleted: boolean) {
  try {
    // Use our proxy to make the request to Google Sheets
    const response = await fetch('https://hooks.jdoodle.net/proxy?url=https://script.google.com/macros/s/YOUR_GOOGLE_SHEETS_WEB_APP_ID/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'updateProgress',
        data: {
          userId,
          courseId,
          completedModules: JSON.stringify(completedModules),
          isCompleted
        }
      })
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating enrollment progress in Google Sheets:', error);
    throw error;
  }
}
 