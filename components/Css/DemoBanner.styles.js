import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  demoBanner: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F59E0B',
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  bannerText: {
    marginLeft: 8,
    color: '#92400E',
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
  },
  exitButton: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  exitButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default styles;
