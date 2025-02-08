class StringConcat:
    @classmethod
    def INPUT_TYPES(cls) -> dict:
        return {
            'optional': {
                'previous': ('STRING', {'forceInput': True, 'default': '', 'multiline': True}),
                'string': ('STRING', {'default': '', 'multiline': True})
            },
            'required': { 'separator': ('STRING', { 'default': '' }) }
        }
    RETURN_TYPES = ('STRING',)
    FUNCTION = 'concat'
    CATEGORY = 'utils'
    def concat(self, separator: str, previous: str = '', string: str = '') -> tuple[str]:
        return (f'{previous}{separator}{string}',) if previous and string else (previous or string,)
