import { createCheckbox } from '../renderer.js';
it('should create checkbox', () => {
  expect(createCheckbox({
    done: false,
    id: '1'
  })).toEqual('<input type="checkbox" data-id="1" class="list-item__checkbox">');
});