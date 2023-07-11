import { render, screen, fireEvent } from '@testing-library/react';
import UploadComponent from '../components/UploadComponent';

describe('UploadComponent', () => {
  it('renders upload icon and text when no file is selected', () => {
    render(<UploadComponent />);
    const uploadIcon = screen.getByAltText('upload icon');
    const uploadText = screen.getByText('Click to upload');
    const uploadText2 = screen.getByText('or drag and drop');
    expect(uploadIcon).toBeInTheDocument();
    expect(uploadText).toBeInTheDocument();
    expect(uploadText2).toBeInTheDocument();
  });
  // Still more to come
});