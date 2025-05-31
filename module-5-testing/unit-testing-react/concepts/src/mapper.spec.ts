import * as apiModel from './api-model';
import * as viewModel from './view-model';
import { mapMemberListFromApiToVm } from './mapper';

describe.skip('mapper specs', () => {
  it.skip('should return empty array when it feeds undefined', () => {
    // Arrange
    const members: apiModel.Member[] = undefined;

    // Act
    const result = mapMemberListFromApiToVm(members);

    // Assert
    const expectedResult: viewModel.Member[] = [];
    expect(result).toEqual(expectedResult);
  });

  it.skip('should return empty array when it feeds null', () => {
    // Arrange
    const members: apiModel.Member[] = null;
    // Act
    const result = mapMemberListFromApiToVm(members);
    // Assert
    const expectedResult: viewModel.Member[] = [];
    expect(result).toEqual([]);
  });

  it.skip('should return empty array when it feeds empty array', () => {
    // Arrange
    const members: apiModel.Member[] = [];

    // Act
    const result = mapMemberListFromApiToVm(members);

    // Assert
    const expectedResult: viewModel.Member[] = [];
    expect(result).toEqual(expectedResult);
  });

  /**
   * Los 3 test anteriores se pueden agrupar en uno solo usando el método it.each
   */
  it.each<{ members: apiModel.Member[] }>([
    { members: undefined },
    { members: null },
    { members: [] },
  ])(
    'should return empty array when it feeds members equals $members',
    ({ members }) => {
      // Arrange

      // Act
      const result = mapMemberListFromApiToVm(members);

      // Assert
      expect(result).toEqual([]);
    }
  );

  it('should return array one mapped item when it feed array with one item', () => {
    // Arrange
    const members: apiModel.Member[] = [
      { id: 1, login: 'test login', avatar_url: 'test avatar' },
    ];

    // Act
    const result = mapMemberListFromApiToVm(members);

    // Assert
    const expectedResult: viewModel.Member[] = [
      {
        id: '1',
        login: 'test login',
        avatarUrl: 'test avatar',
      },
    ];
    expect(result).toEqual(expectedResult);
  });
});
