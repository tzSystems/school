import React from 'react';
import { useSelector } from 'react-redux';

const AdminProfile = () => {
    const { currentUser } = useSelector((state) => state.user);

    const styles = {
        container: {
            minHeight: '100vh',
            margin: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(90deg, #0000ff 0%, #00ff7f 100%)',
            fontFamily: 'Arial, sans-serif',
            padding: '20px',
        },
        card: {
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',  // For Safari support
            border: '1px solid rgba(255, 255, 255, 0.3)',
            padding: '20px',
            width: '100%',
            maxWidth: '400px',
            textAlign: 'center',
            color: 'white',
            position: 'relative',
            zIndex: 1,
        },
        table: {
            width: '100%',
            margin: '20px 0',
            borderCollapse: 'collapse',
            position: 'relative',
            zIndex: 1,
        },
        tableRow: {
            borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
        },
        tableData: {
            padding: '10px 0',
            fontSize: '18px',
            textAlign: 'left',
        },
        label: {
            fontWeight: 'bold',
        },
        edgeCard: {
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            width: '50px',
            height: '50px',
            position: 'absolute',
            zIndex: -1,
        },
        edgeCardTopLeft: {
            top: '-30px',
            left: '-30px',
        },
        edgeCardTopRight: {
            top: '-30px',
            right: '-30px',
        },
        edgeCardBottomLeft: {
            bottom: '-30px',
            left: '-30px',
        },
        edgeCardBottomRight: {
            bottom: '-30px',
            right: '-30px',
        },
        heading: {
            marginBottom: '20px',
            fontSize: '24px',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.heading}>Welcome</h2>
                <table style={styles.table}>
                    <tbody>
                        <tr style={styles.tableRow}>
                            <td style={{ ...styles.tableData, ...styles.label }}>Name:</td>
                            <td style={styles.tableData}>{currentUser.name}</td>
                        </tr>
                        <tr style={styles.tableRow}>
                            <td style={{ ...styles.tableData, ...styles.label }}>Email:</td>
                            <td style={styles.tableData}>{currentUser.email}</td>
                        </tr>
                        <tr style={styles.tableRow}>
                            <td style={{ ...styles.tableData, ...styles.label }}>School:</td>
                            <td style={styles.tableData}>{currentUser.schoolName}</td>
                        </tr>
                    </tbody>
                </table>
                {/* Edge Cards */}
                <div style={{ ...styles.edgeCard, ...styles.edgeCardTopLeft }}></div>
                <div style={{ ...styles.edgeCard, ...styles.edgeCardTopRight }}></div>
                <div style={{ ...styles.edgeCard, ...styles.edgeCardBottomLeft }}></div>
                <div style={{ ...styles.edgeCard, ...styles.edgeCardBottomRight }}></div>
            </div>
        </div>
    );
}

export default AdminProfile;
