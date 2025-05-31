import { mapProjectFromApiToVm } from './project.mapper';

describe('Verify project mapper behaviour', () => {
  it('should return an empty project if the project is null', () => {
    // Arrange
    const nullProject = null;

    // Act
    const result = mapProjectFromApiToVm(nullProject);

    // Assert
    expect(result).toEqual({
      id: '',
      name: '',
      externalId: '',
      comments: '',
      isActive: false,
      employees: [],
    });
  });

  it('should return an empty project if the project is undefined', () => {
    // Arrange
    const undefinedProject = undefined;

    // Act
    const result = mapProjectFromApiToVm(undefinedProject);

    // Assert
    expect(result).toEqual({
      id: '',
      name: '',
      externalId: '',
      comments: '',
      isActive: false,
      employees: [],
    });
  });

  it('should not modify the original object', () => {
    // Arrange
    const project = {
      id: '1',
      name: 'friendly name',
      externalId: '1',
      comments: 'none',
      isActive: true,
      employees: [
        {
          id: '1',
          isAssigned: false,
          employeeName: 'John Doe',
        },
      ],
    };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(project);
  });

  it('should return an empty employees array if the employees property is empty', () => {
    // Arrange
    const project = {
      id: '1',
      name: 'friendly name',
      externalId: '1',
      comments: 'none',
      isActive: true,
      employees: [],
    };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result.employees).toEqual([]);
  });

  it('should support optional properties', () => {
    // Arrange
    const project = {
      id: '1',
      name: 'friendly name',
      externalId: '1',
      comments: 'none',
      isActive: true,
      employees: [
        {
          id: '1',
          isAssigned: false,
          employeeName: 'John Doe',
        },
      ],
    };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(project);
  });
});
