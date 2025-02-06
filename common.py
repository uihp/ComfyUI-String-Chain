''' Credit to rgthree (https://github.com/rgthree/rgthree-comfy) below '''

class AnyType(str):
    """A special class that is always equal in not equal comparisons. Credit to pythongosssss"""

    def __ne__(self, __value: object) -> bool:
        return False

class FlexibleOptionalInputType(dict):
    """A special class to make flexible nodes that pass data to our python handlers.

    Enables both flexible/dynamic input types (like for Any Switch) or a dynamic number of inputs
    (like for Any Switch, Context Switch, Context Merge, Power Lora Loader, etc).

    Note, for ComfyUI, all that's needed is the `__contains__` override below, which tells ComfyUI
    that our node will handle the input, regardless of what it is.

    However, with https://github.com/comfyanonymous/ComfyUI/pull/2666 a large change would occur
    requiring more details on the input itself. There, we need to return a list/tuple where the first
    item is the type. This can be a real type, or use the AnyType for additional flexibility.

    This should be forwards compatible unless more changes occur in the PR.
    """
    def __init__(self, type):
        self.type = type

    def __getitem__(self, key):
        return (self.type, )

    def __contains__(self, key):
        return True
