import React, { useState } from 'react';

function commonShare({ personnelList }) {
  const [itemName, setItemName] = useState('');
   const [importance, setImportance] = useState('Az');
   const [selectedPersonel, setSelectedPersonel] = useState('');
   const [assignmentDate, setAssignmentDate] = useState('');
   const [description, setDescription] = useState('');
 
   const handleSave = () => {
     // Burada kaydetme mantığını ekleyebilirsiniz, örneğin bir API çağrısı
     console.log('Kaydedilen veri:', { itemName, importance, selectedPersonel, assignmentDate, description });
   };
 
   return (
     <div style={styles.formContainer}>
     
       <div style={styles.formGroup}>
         <label style={styles.label} htmlFor="itemName">
           Dosya Adı
         </label>
         <input
           type="text"
           id="itemName"
           placeholder="Dosya adını giriniz"
           value={itemName}
           onChange={(e) => setItemName(e.target.value)}
           style={styles.input}
         />
       </div>
 
       
 
       <div style={styles.formGroup}>
         <label style={styles.label} htmlFor="personnel">
           Dosya Seç
         </label>
         <select
           id="personnel"
           value={selectedPersonel}
           onChange={(e) => setSelectedPersonel(e.target.value)}
           style={styles.input}
         >
           <option value="">Seçiniz</option>
           {personnelList.map((person) => (
             <option key={person.id} value={person.id}>
               {person.name}
             </option>
           ))}
         </select>
       </div>
 
       
       <div style={styles.formGroup}>
         <label style={styles.label} htmlFor="description">
           Açıklama
         </label>
         <textarea
           id="description"
           placeholder="Dosya ile ilgili açıklama giriniz"
           value={description}
           onChange={(e) => setDescription(e.target.value)}
           style={styles.textarea}
         />
       </div>
 
       <div style={styles.buttonGroup}>
         <button style={styles.saveButton} onClick={handleSave}>
           Yayınla
         </button>
       </div>
     </div>
   );
};
const styles = {
 
    formGroup: {
      marginBottom: '15px'
    },
    label: {
      display: 'block',
      marginBottom: '5px',
    },
    input: {
      width: '100%',
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    textarea: {
      width: '100%',
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      height: '100px',
    },
    buttonGroup: {
      textAlign: 'right',
    },
    saveButton: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };

export default commonShare