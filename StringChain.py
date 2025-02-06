class StringChain:
    @classmethod
    def INPUT_TYPES(cls) -> dict:
        return {
            'optional': { 'previous': ('STRING', {'forceInput': True, 'default': '', 'multiline': True}) },
            'required': {
                'separator': ('STRING', {'default': ', '}),
                'string': ('STRING', {'default': '', 'multiline': True}),
            }
        }
    RETURN_TYPES = ('STRING',)
    FUNCTION = 'combine'
    CATEGORY = 'utils'
    def combine(self, string: str, separator: str, previous: str = '') -> tuple[str]:
        return (f'{previous}{separator}{string}',) if previous and string else (previous or string,)
