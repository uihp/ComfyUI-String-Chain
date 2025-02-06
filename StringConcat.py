class StringConcat:
    @classmethod
    def INPUT_TYPES(cls) -> dict:
        return {
            'optional': {
                'previous': ('STRING', {'forceInput': True, 'default': '', 'multiline': True}),
                'string': ('STRING', {'default': '', 'multiline': True})
            },
            'required': {
                'separator': ('STRING', {'default': ', '}),
                'reverse': ('BOOLEAN', {'default': False})
            }
        }
    RETURN_TYPES = ('STRING',)
    FUNCTION = 'concat'
    CATEGORY = 'utils'
    def concat(self, separator: str, reverse: bool, previous: str = '', string: str = '') -> tuple[str]:
        if reverse: previous, string = string, previous
        return (f'{previous}{separator}{string}',) if previous and string else (previous or string,)
