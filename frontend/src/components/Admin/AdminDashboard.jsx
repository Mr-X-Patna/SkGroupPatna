import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useSocket } from '../../hooks/useSocket';
import axios from 'axios';

const AdminDashboard = () => {
    const { t, language } = useLanguage();
    const { API_URL, logout, user } = useAuth();

    const [enquiries, setEnquiries] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState(null);

    const { socket, isConnected } = useSocket(API_URL);

    // Fetch enquiries
    const fetchEnquiries = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/enquiries`, {
                withCredentials: true,
            });
            setEnquiries(res.data.enquiries);
            const unread = res.data.enquiries.filter(e => !e.isRead).length;
            setUnreadCount(unread);
        } catch (error) {
            console.error('Fetch enquiries error:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch unread count
    const fetchUnreadCount = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/enquiries/unread-count`, {
                withCredentials: true,
            });
            setUnreadCount(res.data.unreadCount);
        } catch (error) {
            console.error('Unread count error:', error);
        }
    };

    // Mark as read
    const handleMarkRead = async (id) => {
        try {
            await axios.put(
                `${API_URL}/api/enquiries/${id}/read`,
                {},
                { withCredentials: true }
            );
            setEnquiries(prev =>
                prev.map(e => e._id === id ? { ...e, isRead: true } : e)
            );
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (error) {
            console.error('Mark read error:', error);
        }
    };

    // Delete enquiry
    const handleDelete = async (id) => {
        if (!window.confirm('Delete this enquiry?')) return;
        try {
            await axios.delete(`${API_URL}/api/enquiries/${id}`, {
                withCredentials: true,
            });
            setEnquiries(prev => prev.filter(e => e._id !== id));
            const wasUnread = enquiries.find(e => e._id === id && !e.isRead);
            if (wasUnread) {
                setUnreadCount(prev => Math.max(0, prev - 1));
            }
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    // Socket.IO - new enquiry
    useEffect(() => {
        if (!socket) return;

        socket.on('new-enquiry', (data) => {
            setNotification(data);
            // Play notification sound (optional)
            // Refetch to get full details
            fetchEnquiries();
            fetchUnreadCount();
            // Auto-hide notification after 6 seconds
            setTimeout(() => setNotification(null), 6000);
        });

        return () => {
            socket.off('new-enquiry');
        };
    }, [socket]);

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const formatDate = (date) => {
        return new Date(date).toLocaleString(language === 'hi' ? 'hi-IN' : 'en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <>
            {/* Notification Toast */}
            {notification && (
                <div className="notification-toast">
                    <h6 className="text-gold mb-1">
                        <i className="fas fa-bell me-2"></i>{t('admin.newEnquiry')}
                    </h6>
                    <p className="mb-0 small">
                        <strong>{t('admin.from')}:</strong> {notification.name}<br />
                        <strong>{t('admin.about')}:</strong> {notification.service}
                    </p>
                </div>
            )}

            <div className="container-fluid py-4">
                <div className="row">
                    {/* Sidebar */}
                    <div className="col-md-3 col-lg-2">
                        <div className="admin-sidebar">
                            <h5 className="text-gold">{t('brand')}</h5>
                            <p className="text-muted small">Welcome, {user?.username}</p>
                            <hr />
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <span className="nav-link active">
                                        <i className="fas fa-tachometer-alt me-2"></i>{t('admin.dashboard')}
                                        {unreadCount > 0 && (
                                            <span className="admin-badge-unread ms-2">{unreadCount}</span>
                                        )}
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className="btn btn-danger btn-sm w-100 mt-3"
                                        onClick={logout}
                                    >
                                        <i className="fas fa-sign-out-alt me-2"></i>{t('admin.logout')}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="col-md-9 col-lg-10">
                        <h4 className="mb-4">{t('admin.enquiries')}</h4>

                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-gold"></div>
                            </div>
                        ) : enquiries.length === 0 ? (
                            <div className="card-glow text-center py-5">
                                <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
                                <p className="text-muted">No enquiries yet.</p>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead style={{ background: 'var(--surface-2)' }}>
                                        <tr>
                                            <th>#</th>
                                            <th>{t('enquiry.name')}</th>
                                            <th>Phone</th>
                                            <th>{t('enquiry.service')}</th>
                                            <th>Message</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {enquiries.map((enq, idx) => (
                                            <tr key={enq._id} style={{ background: enq.isRead ? '' : 'rgba(245, 181, 27, 0.05)' }}>
                                                <td>{idx + 1}</td>
                                                <td><strong>{enq.name}</strong></td>
                                                <td>{enq.phone}</td>
                                                <td>
                                                    <span className="badge" style={{ background: 'var(--gold)', color: 'var(--navy)' }}>
                                                        {enq.service}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="d-inline-block text-truncate" style={{ maxWidth: '120px' }}>
                                                        {enq.message}
                                                    </span>
                                                </td>
                                                <td className="small">{formatDate(enq.createdAt)}</td>
                                                <td>
                                                    {enq.isRead ? (
                                                        <span className="badge bg-secondary">{t('admin.read')}</span>
                                                    ) : (
                                                        <span className="admin-badge-unread">{t('admin.unread')}</span>
                                                    )}
                                                </td>
                                                <td>
                                                    <div className="d-flex gap-1">
                                                        {!enq.isRead && (
                                                            <button
                                                                className="btn btn-sm btn-outline-success"
                                                                onClick={() => handleMarkRead(enq._id)}
                                                                title={t('admin.markRead')}
                                                            >
                                                                <i className="fas fa-check"></i>
                                                            </button>
                                                        )}
                                                        <button
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() => handleDelete(enq._id)}
                                                            title={t('admin.delete')}
                                                        >
                                                            <i className="fas fa-trash"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {isConnected ? (
                            <span className="badge bg-success">🟢 Live</span>
                        ) : (
                            <span className="badge bg-danger">🔴 Offline</span>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;