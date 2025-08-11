import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingTop: 0,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 18,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backBtn: {
    marginRight: 12,
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6366F1',
  },
  list: {
    padding: 16,
  },
  staffRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 1,
    justifyContent: 'space-between',
  },
  staffName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  presentBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  absentBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FECACA',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  presentText: {
    color: '#059669',
    fontWeight: 'bold',
    marginLeft: 6,
    fontSize: 15,
  },
  absentText: {
    color: '#DC2626',
    fontWeight: 'bold',
    marginLeft: 6,
    fontSize: 15,
  },
});

export default styles;
